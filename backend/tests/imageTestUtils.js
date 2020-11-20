const validJPG = {
  image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAC//EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AP/B//9k=',
};

const validPNG = {
  image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
};

const invalidFormatGIF = {
  image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
};

const validLinks = [
  {
    link: 'https://live.staticflickr.com/8767/17265134174_a71f78665b_b.jpg',
  },
  {
    link: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Electronic_Frontier_Foundation_video_conferencing_background_dice-2_%2828343325329%29.png',
  },
  {
    link: 'https://live.staticflickr.com/604/32255598460_274caa2db0_b.jpg',
  },
];

const invalidLinks = [
  {
    link: 'esa.esa',
  },
  {
    link: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Polic%C3%ADa-vigila.gif',
  },
];

export default {
  validJPG,
  validLinks,
  validPNG,
  invalidFormatGIF,
  invalidLinks,
};
