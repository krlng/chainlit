import App from 'App';
import { ChainlitClient } from 'api';
import AuthProvider from 'components/authProvider';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { IProjectSettings, projectSettingsState } from 'state/project';
import { settingsState } from 'state/settings';

export default function AppWrapper() {
  const [pSettings, setPSettings] = useRecoilState(projectSettingsState);
  const setAppSettings = useSetRecoilState(settingsState);

  useEffect(() => {
    if (pSettings === undefined) {
      ChainlitClient.getProjectSettings().then((res: IProjectSettings) => {
        setPSettings(res);

        setAppSettings((prev) => ({
          ...prev,
          expandAll: !!res.ui.default_expand_messages,
          hideCot: !!res.ui.hide_cot
        }));
      });
    }
  }, []);

  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
