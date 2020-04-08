import context from "../../backendContext";
const url = `${context.url}/api/auth`;
/**
 * @description  Аутентифицироваться
 * @param {object} authData
 * @param {String} authData.login
 * @param {String} authData.password
 * @returns {object} {name, userJWT, role} ответ от сервера
 *
 */
export default async (authData) => {
  const config = {
    method: "POST",
    data: authData,
    withCredentials: true,
    url: `${url}/login`,
    headers: context.headersNoAuth,
  };
  return await context.tryCatchFunctionAxios(config);
};
