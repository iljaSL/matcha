import matchModel from '../models/matchModel.js';
import jsonWebTokenUtils from '../utils/jasonWebTokenUtils.js';

const getProfiles = async (request, response, next) => {
  const tokenUserId = jsonWebTokenUtils.getUserId(request.token);
  const distance = request.body.distance ? request.body.distance : 200;

  try {
    return response.status(200).json(await matchModel.getProfiles(tokenUserId, distance));
  } catch (err) { next(err); }
  return response.status(500).end();
};

export default {
  getProfiles,
};
