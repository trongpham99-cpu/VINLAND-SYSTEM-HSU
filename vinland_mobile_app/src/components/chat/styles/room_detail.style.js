import COLORS from "../../../constants/colors";
export const styles = {
  block_room: {
    // backgroundColor: COLORS.bgColor,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderColor: COLORS.greylight,
    borderBottomWidth: 1,
  },

  block_message: {
    // flex: 2,
    padding: 10,
  },
  tinyLogo: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  name_room: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
  },
  icon: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },

  iconCamera: {
    fontWeight: "bold",
    backgroundColor: COLORS.grey,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  user_name: {},
  block_input: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    display: "flex",
    position: "fixed",
    bottom: 0,
    left: 0,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: COLORS.greylight,
    borderRadius: 50,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginLeft: 10,
  },
};
