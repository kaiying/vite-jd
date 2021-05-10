<template lang="pug">
transition(name='modal')
  .modal-mask(@click="close" :class="{ 'is-height-limited': isHeightLimited, 'is-height-fixed': isHeightFixed }")
    .modal-wrapper
      .modal-container.container(@click.stop="() => true")
        .header(v-if="showHeader")
          slot(name='header')
        .body
          slot(name='body')
        .footer(v-if="showFooter")
          slot(name='footer')
            .d-flex.flex-row-reverse
              button.btn.btn-secondary(type="button" @click="close")
                | OK
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import useModalKeyDownEsc from '@/src/mixins/utility/use-modal-keydown-esc';

const props = {
  showHeader: {
    type: Boolean,
    default: false,
  },
  showFooter: {
    type: Boolean,
    default: false,
  },
  isHeightLimited: {
    type: Boolean,
    default: false,
  },
  isHeightFixed: {
    type: Boolean,
    default: false,
  },
};

const data = function () {
  return {
    show: true,
  };
};

const lockBodyScroll = (y) => () => {
  y.value = window.pageYOffset;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${y.value}px`;
  document.body.style.left = 0;
  document.body.style.right = 0;
  document.body.style.bottom = 0;
};
const unlockBodyScroll = (y) => () => {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.bottom = '';
  window.scrollTo(0, y.value);
};

const mounted = (lock) => () => {
  lock();
};

const destroyed = (unlock) => () => {
  unlock();
};

const setup = function (props, context) {
  const savedScrollY = ref(0);

  // methods
  const lock = lockBodyScroll(savedScrollY);
  const unlock = unlockBodyScroll(savedScrollY);

  // life cycle
  onMounted(mounted(lock));
  onUnmounted(destroyed(unlock));

  useModalKeyDownEsc(context);
  return {
    lockBodyScroll: lock,
    unlockBodyScroll: unlock,
  };
};

const methods = {
  close() {
    this.$emit('close');
  },
};
export default {
  name: 'Modal',
  props,
  setup,
  data,
  methods,
};
</script>

<style lang="scss" scoped>
@import 'src/assets/components/utility/modal';
</style>
