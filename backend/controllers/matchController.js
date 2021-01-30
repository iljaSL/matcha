import matchModel from '../models/matchModel.js';
import jsonWebTokenUtils from '../utils/jasonWebTokenUtils.js';
import userModel from '../models/userModel.js';
import chatModel from '../models/chatModel.js';

const getProfiles = async (request, response, next) => {
  try {
    const tokenUserId = jsonWebTokenUtils.getUserId(request.token);
    const distance = request.params.distance ? request.params.distance : 200;
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

const addLike = async (request, response, next) => {
  try {
    const tokenUserId = jsonWebTokenUtils.getUserId(request.token);
    const { likedId } = request.params;
    const success = await chatModel.addLike(tokenUserId, likedId);
    if (!success) return response.status(403).end();
    return response.status(200).end();
  } catch (err) { next(err); }
};

const removeLike = async (request, response, next) => {
  try {
    const tokenUserId = jsonWebTokenUtils.getUserId(request.token);
    const { likedId } = request.params;
    const success = await chatModel.removeLike(tokenUserId, likedId);
    if (!success.rowCount) return response.status(403).end();
    return response.status(200).end();
  } catch (err) { next(err); }
};

const getMatchStatus = async (request, response, next) => {
  try {
    const tokenUserId = jsonWebTokenUtils.getUserId(request.token);
    const { profileId } = request.params;
    const matchStatus = await matchModel.getLikedStatus(tokenUserId, profileId);
    return response.status(200).json(matchStatus);
  } catch (err) { next(err); }
};

export default {
  getProfiles,
  addLike,
  removeLike,
  getMatchStatus,
};
