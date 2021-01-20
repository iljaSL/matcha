import tagModel from '../models/tagModel.js';
import userModel from '../models/userModel';

const getTags = async (request, response, next) => {
  try {
    return response.status(200).json(await tagModel.getTags());
  } catch (err) { next(err); }
  return response.status(500);
};

const getTagById = async (request, response, next) => {
  try {
    const tag = await tagModel.getTagById(request.params.id);
    if (tag) return response.status(200).json(tag);
  } catch (err) { next(err); }
  return response.status(400).json('no such tag');
};

const addTag = async (request, response, next) => {
  const { tag } = request.body;
  try {
    if (await tagModel.isDuplicate(tag)) return response.status(409).json({ error: 'Duplicate' });
    return response.status(201).json({ status: 'success', id: await tagModel.addTag(tag) });
  } catch (err) { next(err); }
  return response.status(500);
};

const getTagUsers = async (request, response, next) => {
  try {
    return response.status(200).json(await tagModel.getTagUsers(request.params.id));
  } catch (err) { next(err); }
  return response.status(500);
};

const getTagsByUid = async (request, response, next) => {
  try {
    const { uid } = request.params;
    return response.status(200).json(await userModel.getTagsByUid(uid));
  } catch (err) { next(err); }
};

export default {
  getTags, addTag, getTagById, getTagUsers, getTagsByUid,
};
