import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 50,
    width: "90%",
    borderWidth: 1,
    padding: 16,

    fontSize: 16,
    fontFamily: "Roboto",
    borderRadius: 10,
    backgroundColor: "rgba(246, 246, 246, 1)",
    borderColor: "rgba(232, 232, 232, 1)",
  },
  inputFocused: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(255, 108, 0, 1)",
  },
  appButtonContainer: {
    width: "90%",
    height: 50,

    marginTop: 43,

    justifyContent: "center",
    textAlign: "center",

    borderRadius: 100,

    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,

    backgroundColor: "rgba(255, 108, 0, 1)",
  },
  appButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Roboto",
    textAlign: "center",
  },
  haveAccountText: {
    color: "#1B4371",

    fontSize: 16,
    fontFamily: "Roboto",
  },
  formContainer: {
    width: "100%",
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
