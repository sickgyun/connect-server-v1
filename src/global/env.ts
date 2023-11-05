const { JWT_SCRECT_KEY, BSM_AUTH_CLIENT_ID, BSM_AUTH_CLIENT_SECRET } = process.env;

const getEnvCofigs = () => {
  if (!JWT_SCRECT_KEY) throw new Error('JWT_SCRECT_KEY is not defined');
  if (!BSM_AUTH_CLIENT_ID) throw new Error('BSM_AUTH_CLIENT_ID is not defined');
  if (!BSM_AUTH_CLIENT_SECRET) throw new Error('BSM_AUTH_CLIENT_SECRET is not defined');

  return { JWT_SCRECT_KEY, BSM_AUTH_CLIENT_ID, BSM_AUTH_CLIENT_SECRET };
};

export default getEnvCofigs;
