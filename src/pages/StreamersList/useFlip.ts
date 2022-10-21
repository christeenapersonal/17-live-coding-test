import {
  useLayoutEffect,
  useRef,
} from 'react';

export const useFlip = (listRef: React.RefObject<HTMLElement>) => {

  const origins = useRef<{ [key: string]: DOMRect }>({});
  let firstRun = useRef(true);

  // React FLIP (First Last Invert Play)

  /* useLayoutEffect to read layout from the DOM and synchronously re-render.
   * Updates scheduled inside useLayoutEffect will be flushed synchronously 
   * before the browser has a chance to paint. */

  useLayoutEffect(() => {

    if (listRef.current === null) return;

    const list = listRef.current;

    const children: HTMLElement[] = [].slice.call(list.children);


    for (const child of children) {

      const key = child.dataset.key!;

      //  next position of the item after list reorder
      const next = child.getBoundingClientRect();

      if (!firstRun.current) {
        //check every item on the list
        if (key in origins.current) {
          //previous position of the item
          const previous = origins.current[key];
          const delta = getDelta(previous, next);

          // This line of code is for checking the differences. If there is a difference, we applied animation to this item.
          if (!isZero(delta)) {
            invert(delta, child);

            requestAnimationFrame(() => {
              play(child);
            });
          }
        }
      }
      origins.current[child.dataset.key!] = next;
    }

    firstRun.current = false;
  }, [listRef]);
};

/*
* We compute the delta between the final position and the initial position of the element. 
* Then we apply the opposite of the delta using a transform property to set the element back to its initial position.
* Apart from this, the DOM remains in its final state.
 */
const invert = (delta: Rect, elem: HTMLElement) => {
  elem.style.transform = `translate(${delta.left}px, ${delta.top}px)`;
  elem.style.transition = `transform 0s`;

};

/*
Finally, we apply a transform: translate(0,0); to the element with a transition on transform property. 
This will override the previous transform while animating the element to its final position. */

const play = (elem: HTMLElement) => {
  elem.style.transform = `translate(0, 0)`;
  elem.style.transition = `transform 300ms ease`;

};


type Rect = Pick<DOMRect, 'top' | 'left'>;

const getDelta = (start: Rect, target: Rect) => ({
  top: start.top - target.top,
  left: start.left - target.left,
});

const isZero = (delta: Rect) => delta.left === 0 && delta.top === 0;
