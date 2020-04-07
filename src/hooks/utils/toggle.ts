export const expandHeight: (elem: HTMLElement) => void = (elem) => {
  elem.style.height = "auto";

  let height = elem.clientHeight + "px";

  // setting height to 0 and setTimeout are needed
  // for css transition to trigger
  elem.style.height = "0px";
  setTimeout(() => (elem.style.height = height), 0);
};

export const collapseHeight: (elem: HTMLElement) => void = (elem) => {
  elem.style.height = "0px";
};
