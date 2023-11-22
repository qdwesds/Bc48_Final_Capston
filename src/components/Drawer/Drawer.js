import { useDispatch, useSelector } from "react-redux";
import { closeDrawer } from "../../redux/Slice/generalSlice";
import { Drawer } from "antd";

export default function GeneralDrawer() {
  const dispatch = useDispatch();
  const { isDrawerOpen, DrawerContent } = useSelector(
    (state) => state.generalSlice
  );
  const onClose = () => {
    dispatch(closeDrawer());
  };

  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={onClose}
      open={isDrawerOpen}
      key="right"
      size="large"
    >
      {DrawerContent}
    </Drawer>
  );
}
