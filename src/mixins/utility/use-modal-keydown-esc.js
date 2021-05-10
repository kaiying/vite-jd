/**
 * 按 `ESC` 會發送 `close` event
 */
import { onMounted, onUnmounted } from 'vue';

const keyDownEventListener = ({ emit }) => (e) => {
  if (e.keyCode !== 27) return;
  emit('close');
};

const mounted = (listener) => () => {
  document.addEventListener('keydown', listener);
};

const destroyed = (listener) => () => {
  document.removeEventListener('keydown', listener);
};

export default function (context) {
  // life cycle
  const listener = keyDownEventListener(context);

  onMounted(mounted(listener));
  onUnmounted(destroyed(listener));
  return {};
}
