import vm from '../main';

export default (data) => {
  vm.$router.push(data).catch((error) => {
    if (error.name !== 'NavigationDuplicated') {
      throw error;
    }
  });
};
