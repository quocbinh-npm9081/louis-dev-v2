import { connect } from 'mongoose';
const URL = process.env.MONGODB_URL;

const Connect_mongodb_atlas = async () => {
  try {
    await connect(`${URL}`);
    console.log('Connect DB successfully !!!');
  } catch (error) {
    console.log('Connect DB failse !!!');
  }
};

export { Connect_mongodb_atlas };
