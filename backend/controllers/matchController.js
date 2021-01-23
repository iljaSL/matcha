import matchModel from '../models/matchModel.js';
import jsonWebTokenUtils from '../utils/jasonWebTokenUtils.js';
import userModel from '../models/userModel.js';

const getProfiles = async (request, response, next) => {
  try {
    const tokenUserId = jsonWebTokenUtils.getUserId(request.token);
    const distance = request.body.distance ? request.body.distance : 200;
    const userData = await userModel.findUserById(tokenUserId);
    const orientation = userData.sexual_orientation;
    // eslint-disable-next-line no-nested-ternary
    const genderPreference = orientation === 'androsexual'
      ? 'man'
      : orientation === 'gynesexual'
        ? 'woman'
        : null;
    return response.status(200).json(await matchModel.getProfilesByDistance(tokenUserId, distance, genderPreference));
  } catch (err) { next(err); }
};

export default {
  getProfiles,
};
