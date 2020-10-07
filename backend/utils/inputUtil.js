export default {
  realName: (data) => {
    const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð ,.'-]+$/u;
    return !(data == null || data === '' || /\s/.test(data) || !data.match(regex) || data.length < 2 || data.length > 30);
  },
  username: (data) => {
    const regex = /^[a-zA-Z0-9]*-?[a-zA-Z0-9]*$/;
    return !(data == null || data === '' || /\s/.test(data) || !data.match(regex) || data.length < 2 || data.length > 30);
  },
  mail: (data) => {
    const regex = /^([a-zA-Z0-9]+(?:[.\-_]?[a-zA-Z0-9]+)*)@([a-zA-Z0-9]+(?:[.\-_]?[a-zA-Z0-9]+)*)\.([a-zA-Z]{2,})+$/;
    return !(data == null || data === '' || /\s/.test(data) || !data.match(regex));
  },
  password: (data) => {
    const regex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
    return !(data == null || data === '' || /\s/.test(data) || !data.match(regex));
  },
};
