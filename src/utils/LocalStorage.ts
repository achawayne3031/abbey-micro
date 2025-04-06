import { reactLocalStorage } from "reactjs-localstorage";

export const saveToken = (token: string) => {
  reactLocalStorage.set("@abbey_microbank_token", token);
};

export const getToken = () => {
  const token = reactLocalStorage.get("@abbey_microbank_token");
  return token ? token : null;
};

export const saveData = (data: any) => {
  reactLocalStorage.set("@abbey_microbank_user", JSON.stringify(data));
};

export const getData = () => {
  const storedUser: any = reactLocalStorage.get("@abbey_microbank_user");
  const jsonStored = storedUser ? JSON.parse(storedUser) : null;
  return jsonStored;
};

export const logOut = () => {
  reactLocalStorage.remove("@abbey_microbank_user");
  reactLocalStorage.remove("@abbey_microbank_token");
};
