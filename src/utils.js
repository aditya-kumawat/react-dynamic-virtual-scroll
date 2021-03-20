export const isInView = (container, element) => {
    const containerTop = container.offsetTop;
    const elementRect = element.getBoundingClientRect();
    const elementTop = elementRect.top;
    const elementHeight = elementRect.height;

    return elementHeight - (containerTop - elementTop) > 0;
}