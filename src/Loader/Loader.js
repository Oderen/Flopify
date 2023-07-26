import { ThreeDots } from "react-loader-spinner";

export const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",

        width: "200px",
        heigth: "200px",

        marginTop: "150px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <ThreeDots
        width="120px"
        heigth="120px"
        radius="9"
        color="tomato"
        ariaLabel="three-dots-loading"
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

// export default Loader;
