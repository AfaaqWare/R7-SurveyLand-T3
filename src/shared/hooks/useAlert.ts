import Swal from "sweetalert2";
import { useTranslations } from "next-intl";

export function useAlert() {
  const t = useTranslations("common");

  const showAlert = (icon: "success" | "error", title: string, text?: string) => {
    void Swal.fire({
      icon,
      title,
      text,
      confirmButtonText: t("ok"),
      confirmButtonColor: "var(--color-primary)",
    });
  };

  return {
    showAlert,
  };
}
