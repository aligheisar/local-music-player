import { GetContext } from "../context/context";

let Input = () => {
  let { fileChange } = GetContext();

  return <input onChange={fileChange} multiple accept="audio/*" type="file" />;
};

export default Input;
