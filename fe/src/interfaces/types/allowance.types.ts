export type TAllowance = {
  allowance_CD: string;
  allowance_description: string;
  allowance_nepali_desc: string;
  allowance_facility: string;
  allowance_taxable: string;
  allowance_facility_percent: string | null;
  allowance_cit_flag: string | boolean;
  allowance_type: string;
  salary_allowance_flag: string | boolean;
  allowance_acc_cd: string;
  allowance_acc_desc?: string;
  allowance_disabled: string | boolean;
};
