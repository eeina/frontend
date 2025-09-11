import { AlertTriangle, Ban, CheckCircle, Edit2, FileText, FileTextIcon, Globe, Globe2, LogOut, Scale, Shield, User } from "lucide-react"
import { Header } from "../../components/Header"
import { PoliciesHeader } from "../../components/Policies/PoliciesHeader"
import { useLanguage } from "../../contexts/LanguageContext";
import { PoliciesCard } from "../../components/Policies/PoliciesCard";
import { PolicyCardItem } from "../../components/Policies/PoliciesCard/PoliciesCard";
import { AdSection } from "../Home/sections/AdSection";
import { PoliciesContact } from "../../components/Policies/PoliciesContact";

export const Terms_Conditions = (): JSX.Element => {
 const {t,language} = useLanguage();
 const Terms_Condition:PolicyCardItem[] =[
     {
        icon: <CheckCircle />,
        title:`${t.privacy_policy.Acceptance_Terms}` ,
        subtitle: `${t.privacy_policy.Acceptance_Terms_info}`,
       
      },
     {
        icon: <Globe />,
        title:`${t.privacy_policy.Description_Service}` ,
        subtitle: `${t.privacy_policy.Description_Service_info}`,
       
      },
     {
        icon: <User />,
        title:`${t.privacy_policy.User_Account}` ,
         bullets:[
          `${t.privacy_policy.Eligibility}`,
          `${t.privacy_policy.Account_Security}`,
          `${t.privacy_policy.Accuracy_Information}`,
        
       
        ]
       
      },
     {
        icon: <FileTextIcon />,
        title:`${t.privacy_policy.User_Generated_Content}` ,
         bullets:[
          `${t.privacy_policy.Ownership}`,
          `${t.privacy_policy.License_Grant_Company}`,
          `${t.privacy_policy.Content_Responsibility}`,
        
        ]
       
      },
     {
        icon: <Ban/>,
        title:`${t.privacy_policy.Prohibited_Conduct}` ,
        subtitle:`${t.privacy_policy.Prohibited_ConductInfo}`,
         bullets:[
          `${t.privacy_policy.Violation_Sharia}`,
          `${t.privacy_policy.Violation_Law_Morals}`,
          `${t.privacy_policy.Defamation_HateSpeech}`,
          `${t.privacy_policy.Infringement_IP}`,
          `${t.privacy_policy.Malware_Viruses}`,
          `${t.privacy_policy.Unauthorized_DataCollection}`,
        
        ],
        extraInfo:`${t.privacy_policy.Enforcement_Action}`
       
      },
     {
        icon: <Shield/>,
        title:`${t.privacy_policy.Data_Protection}` ,
        subtitle:`${t.privacy_policy.Data_Protection_info}`,
      
      },
     {
        icon: <FileText/>,
        title:`${t.privacy_policy.Company_IP}` ,
        subtitle:`${t.privacy_policy.Company_IP_info}`,
      
      },
     {
        icon: <LogOut/>,
        title:`${t.privacy_policy.Termination}` ,
        subtitle:`${t.privacy_policy.Termination_info}`,
      
      },
     {
        icon: <AlertTriangle/>,
        title:`${t.privacy_policy.Disclaimer_Liability}` ,
        subtitle:`${t.privacy_policy.Disclaimer_Liability_info}`,
      
      },
     {
        icon: <Scale/>,
        title:`${t.privacy_policy.Governing_Law}` ,
        subtitle:`${t.privacy_policy.Governing_Law_info}`,
      
      },
     {
        icon: <Globe2/>,
        title:`${t.privacy_policy.Terms_Language}` ,
        subtitle:`${t.privacy_policy.Terms_Language_info}`,
      
      },
     {
        icon: <Edit2/>,
        title:`${t.privacy_policy.Terms_Modification}` ,
        subtitle:`${t.privacy_policy.Terms_Modification_info}`,
      
      },
 ]
  return (
    <div className="bg-gray-50 min-h-screen">
         <Header/>
         <div className="max-w-5xl mx-auto px-6 py-8">
            
         <PoliciesHeader 
          icon={<FileText className="w-8 h-8 text-[#22ae4b]"/>}
          title={t.privacy_policy.Terms_Conditions}
          extraInfo={t.privacy_policy.Terms_Conditions_gov}
          subtitle={t.privacy_policy.Terms_subTitle}
          lastUpdated={language === "ar" ? "آخر تحديث: 4 سبتمبر 2025" : "Last Updated: September 4, 2025"}
         />
         <div className="space-y-8">
                   {Terms_Condition.map((item, index) => (
                     <PoliciesCard
                       key={index}
                       icon={item.icon}
                       title={item.title}
                       subtitle={item.subtitle}
                       bullets={item.bullets}
                       extraInfo={item.extraInfo}
                     />
                   ))}
        </div>
        <PoliciesContact
        title={t.privacy_policy.Contact_Information}
        subtitle={t.privacy_policy.Contact_Information_dusc}
        email={t.privacy_policy.contactEmail}
        bg_color="bg-[#ececec]"
        />
        </div>
         <AdSection />
    </div>
  )
}

