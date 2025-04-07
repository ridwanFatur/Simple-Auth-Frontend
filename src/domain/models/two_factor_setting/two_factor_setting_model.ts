export interface TwoFactorSettingModel {
  method: string;
}

export interface TwoFactorSetupModel {
  qr_url?: string;
  secret?: string;
}


