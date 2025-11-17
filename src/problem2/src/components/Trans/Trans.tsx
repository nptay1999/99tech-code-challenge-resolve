import { Trans as I18nTrans, useTranslation } from "react-i18next";

function Trans(props: React.ComponentProps<typeof I18nTrans>) {
  const { t } = useTranslation();
  return <I18nTrans t={t} {...props} />;
}

export default Trans;
