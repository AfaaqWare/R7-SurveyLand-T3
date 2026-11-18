import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildSeo } from "@/core/seo/Seo";
import SignInFormContainer from "@/modules/auth/components/organisms/SignInFormContainer";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.forms.signIn.meta");

  return buildSeo({
    title: t("title"),
    description: t("description"),
  });
}

export default function SignInPage() {
  return <SignInFormContainer />;
}
