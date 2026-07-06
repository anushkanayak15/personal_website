type Listener = (open: boolean) => void;

const listeners = new Set<Listener>();
let isOpen = false;

export function subscribeCommandPalette(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function emit() {
  listeners.forEach((listener) => listener(isOpen));
}

export function openCommandPalette() {
  isOpen = true;
  emit();
}

export function closeCommandPalette() {
  isOpen = false;
  emit();
}

export function toggleCommandPalette() {
  isOpen = !isOpen;
  emit();
}
