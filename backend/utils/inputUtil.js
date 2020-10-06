export default {
  lastname: (data) => {
    const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    // console.log(data);
    if (data == null || data === '') return { error: 'Input can not be empty!' };
    if (/\s/.test(data)) return { error: 'lastname can not contain empty spaces!' };
    if (!data.match(regex)) return { error: 'invalid lastname' };
    if (data.length < 2 || data.length > 20) return { error: 'lastname needs to be between 2 and 19 chars long' };
    return { status: 'valid' };
  },

  firstname: (data) => {
    const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

    if (data == null || data === '') return { error: 'Input can not be empty!' };
    if (/\s/.test(data)) return { error: 'firstname can not contain empty spaces!' };
    if (!data.match(regex)) return { error: 'invalid firstname' };
    if (data.length < 2 || data.length > 20) return { error: 'firstname needs to be between 2 and 19 chars long' };
    return { status: 'valid' };
  },

  username: async (data) => {
    const regex = /^[a-zA-Z0-9]*-?[a-zA-Z0-9]*$/;

    if (data == null || data === '') return { error: 'Input can not be empty!' };
    if (/\s/.test(data)) return { error: 'username can not contain empty spaces!' };
    if (!data.match(regex)) return { error: 'invalid username' };
    if (data.length < 2 || data.length > 30) return { error: 'username needs to be between 2 and 29 chars long' };

    // Check db for already existing username
    // const result = await userModel.findUser("username", data);
    // if (result != "") return { error: "already exists" };
    // else return { status: "valid" };
  },

  mail: async (data) => {
    if (data == null || data === '') return { error: 'Input can not be empty!' };
    if (/\s/.test(data)) return { error: 'mail can not contain empty spaces!' };
    // Check pattern
    const mailPattern = /^([a-zA-Z0-9]+(?:[\.\-\_]?[a-zA-Z0-9]+)*)@([a-zA-Z0-9]+(?:[\.\-\_]?[a-zA-Z0-9]+)*)\.([a-zA-Z]{2,})+$/;
    if (!mailPattern.test(data)) return { error: 'invalid email' };
    // Check db for already existing mail
    // var result = await userModel.findOne("mail", data);
    // if (result != "") return { error: "already exists" };
    // else return { status: "valid" };
  },

  password: (data) => {
    if (data == null || data === '') return { error: 'Input can not be empty!' };
    if (/\s/.test(data)) return { error: 'password can not contain empty spaces!' };
    const pwdPattern = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
    // console.log(data);
    if (!pwdPattern.test(data)) return { error: 'invalid password' };
    return { status: 'valid' };
  },
};
