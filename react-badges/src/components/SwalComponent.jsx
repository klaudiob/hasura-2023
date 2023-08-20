import Swal from "sweetalert2";

const SwalComponent = (text, icon, timer) => {
  return Swal.fire({
    text,
    icon,
    timer,
    showConfirmButton: false,
    customClass: {
      container: "custom-swal-container", 
    },
  });
};

export default SwalComponent;
