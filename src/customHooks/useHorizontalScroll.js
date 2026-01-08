import { useRef, useEffect } from 'react';

function useHorizontalScroll() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      const handleWheel = (e) => {
        if (!e.shiftKey) {
          e.preventDefault();
          element.scrollLeft += e.deltaY;
        }
      };
      element.addEventListener('wheel', handleWheel, { passive: false });
      return () => element.removeEventListener('wheel', handleWheel);
    }
  }, []);

  return scrollRef;
}

export default useHorizontalScroll;