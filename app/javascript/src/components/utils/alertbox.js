import swal from "sweetalert";

const alertBox = props => {
  const { title, text, icon, confirmAction, redirectUrl } = props;
  return swal({
    title: title,
    text: text,
    icon: icon,
    buttons: true,
    dangerMode: true,
  }).then(async willDelete => {
    if (willDelete) {
      try {
        const response = await confirmAction();
        swal(response.data.success, {
          icon: "success",
        });
        window.location.href = redirectUrl;
      } catch (error) {
        logger.error(error);
      }
    }
  });
};

export default alertBox;
