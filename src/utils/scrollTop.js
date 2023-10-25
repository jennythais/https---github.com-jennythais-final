const scrollTop = (target) => {
  if (target) {
    const offsetTop =
      window.innerWidth >= 992 ? target.offsetTop - 52 : target.offsetTop;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
};

export default scrollTop;
