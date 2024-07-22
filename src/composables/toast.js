import { ref, onUnmounted } from "vue";

export const useToast = () => {
  const showToast = ref(false);
  const toastMessage = ref("");
  const toastAlertType = ref("");
  const timeout = ref(null);

  const triggerToast = (message, type = "success") => {
    toastMessage.value = message;
    toastAlertType.value = type;
    showToast.value = true;
    timeout.value = setTimeout(() => {
      console.log("hello"); // 5초가 지나기 전에 페이지를 빠져나오면 더이상 콘솔에 hello 가 찍히지 않는다.
      toastMessage.value = "";
      toastAlertType.value = "";
      showToast.value = false;
    }, 1000);
    onUnmounted(() => {
      clearTimeout(timeout.value);
    });
  };

  return {
    showToast,
    toastMessage,
    toastAlertType,
    triggerToast,
  };
};
