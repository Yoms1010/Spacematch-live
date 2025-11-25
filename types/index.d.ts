import Properties from '../components/AllProperties';
import { Alert } from 'react-native';
import { Button } from '@/components/ui/button';
import React from 'react';
import { LinkProps } from 'next/link';
import value from '../../../reactive/ichatly/types/image';
import { data } from '../../../reactive/iryde/constants/index';
import profile from '@/assets/icons/profile.png';
/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  type: String;
  // searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================

declare type SignUpParams = {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
  password: string;
};

declare type LoginUser = {
  email: string;
  password: string;
};

declare type VendorProps = {
  id: number;
  name: string;
  email: string;
  code: string;
  mobile: string | any | number;
  developer_type: string;
  is_document_verified: string;
  created_at: string;
  actions: string;
}

// Define a type for the user object to ensure type safety throughout the component.
declare interface User {
  id: number;
  client_sc_id: number | null;
  vendor_sc_id: number | null;
  name: string;
  whoId: string;
  email: string;
  email_verified_at: string | null;
  photo: string;
  complete: string;
  terms_and_conditions: string | null;
  refund_policy: string | null;
  isSubscribed: string;
  plan: string;
  active: string;
  created_at: string;
  updated_at: string;
}


declare type NewUserParams = {
  userId: string;
  email: string;
  name: string;
  password: string;
};

declare interface HomeHeaderBoxProps{
  vendor?: string;
  client?: string;
  title?: string;
  subtext?: string;
  label?: string;
  children: React.ReactNode;
}

declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title?: string;
  subtext?: string;
  user?: string;
}

declare interface MobileNavProps {
  user: String | User;
  who: String;
}

declare interface PageHeaderProps {
  topTitle: string;
  bottomTitle: string;
  topDescription: string;
  bottomDescription: string;
  connectBank?: boolean;
}

declare interface PaginationProps {
  page: number;
  totalPages: number;
}

declare interface PropertiesProps {
  id: number
  imgSource: string;
  alt: string;
  title: string;
  location: String; 
  lga: String;
  city: string;
  state: string;
  country: string;
  cost_per_sqm: number; 
  beds: Integer; 
  total_cost: number;
  squareMeters: Integer;
  children: React.ReactNode;
  bought: string
}


declare interface PropertyItemProps {
    country: any;
    state: any;
    id: any; 
    property_image: any; 
    title: string; 
    total_cost: number; 
    city: String; 
    cost_per_sqm: number;
    bought: string; 
    lga: String; 
    squareMeters: any; 
    description: string;
    docsVerified: boolean;
    property_image: {
      path: string;
    }[]
}

// declare type User = sdk.Models.Document & {
//   accountId: string;
//   email: string;
//   name: string;
//   items: string[];
//   accessToken: string;
//   image: string;
// };

declare interface FooterProps {
  user : String;
  logo: String;
  type: String;
  contact: String;
  copyright: String;
}

declare interface AuthFormProps {
  type: "sign-in" | "sign-up";
}


declare interface TotlaBalanceBoxProps {
  accounts: Account[];
  totalBanks: number;
  totalCurrentBalance: number;
}

declare interface RightSidebarProps {
  user: User;
  transactions: Transaction[];
  banks: Bank[] & Account[];
}

declare interface SiderbarProps {
  user: {
    complete: string;
  };
  who: String; 
  agentChatCount: any
  buyerChatCount: any
}

declare interface NavBarProps {
  user: String;
  type : String
}

declare interface InputFieldProps {
  title: String; 
  handleChangeText: ChangeEventHandler<HTMLInputElement>;
  value: string, 
  otherStyles: string; 
  placeholder: string;
  type: string;
  required: boolean;
  disabled: boolean;
  name?: string;
}

declare interface InputFieldsProps {
  title: String; 
  handleChangeText: ChangeEventHandler<HTMLInputElement>;
  value: string, 
  otherStyles: string; 
  placeholder: string;
  type: string;
  required: boolean;
  disabled: boolean;
  name?: string;
}

declare interface FilterPropertiesProps {
  title: string; 
  min: number;
  max: number;
  value: number;
  price: string;
  minPrice: string;
  maxPrice: string;
  // otherStyles: string; 
  // children: React.ReactNode;
  handleRangeChange: ChangeEventHandler<HTMLInputElement>;
  handleSizeChange: ChangeEventHandler<HTMLInputElement>;
  handleLocationChange: ChangeEventHandler<HTMLInputElement>;
}

declare interface SelectFieldProps {
  title: String; 
  handleChangeText: ChangeEventHandler<HTMLInputElement>;
  value: string, 
  otherStyles: string; 
  value: string;
  value1: string; 
  value2: string;
  value3: string;
  title1: string;
  title2: string; 
  title3: string;
}

// Defines the props for the PropertyCard component.
declare interface PropertyCardProps {
    property: Property;
    onSave: (id: number, title: string) => void;
    onCompare: (id: number) => void;
    onRequestInfo: (id: number) => void;
    isComparing: boolean;
}

declare interface TransactionTableProps {
  transactions: Transaction[];
}

declare interface DoughnutChartProps {
  accounts: Account[];
}


declare interface signInProps {
  email: string;
  password: string;
}

declare interface AnalysisProps {
  title: string;
  data: number | string;
  img?: string;
  day: string;
  labels: any[];
  percentage: number;
}

declare interface TableProps {
  header: string;
  title1: string;
  title2: string;
  title3: string;
  title4: string;
  title5: string;
  title6: string;
  title7: string;
  handleEdit?: any;
  handleDelete?: any;
  children: React.ReactNode
}

declare interface ClientProps{
    id: number 
    name: string
    email: string
    code: string
    mobile: string
    occupation: string
    city: string
    lga: string
    state: string
    country: string
    ownership_type: string
    isSubscribed: string
    photo: string
    photoPath: string
    photoUrl: string
    otp_verified: string
    terms_and_conditions: string
    refund_policy: string
    is_property_verified: string
    active: string
    length: any
}

declare interface DeveloperDataProps {
  propertyData: any;
  userInfo: {isSubscribed: string}
}

declare interface DeveloperItemProps { 
  id: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; 
  title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; 
  lga: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; 
  state: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; 
  created_at: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined | function; 
  bought: string 
}

declare interface SubscriptionPayloadProps {
    clientId: any;
    clientSubId: number;
    title: string;
    cost: string;
    txRef: string;
    transactionId: number;
    paymentOption: string;
    status: string;
}


interface VendorSubDataProps{
  id: number | string
  vendor_id: string | number,
  vendor_sc_id: number | string,
  title: string,
  amount: any,
  currency: string,
  transaction_ref: string,
  payment_option: string,
  status: string,
  active: string
  created_at: string
}

interface ClientSubDataProps{
  id: number | string;
  client_id: string | number,
  client_sc_id: number | string,
  title: string,
  amount: any,
  currency: string,
  transaction_ref: string,
  payment_option: string,
  status: string,
  active: string
  created_at: string
}


interface Column<T> {
  header: string;
  accessor: keyof T;
  sortable?: boolean;
}

// --- Form State Initialization ---
interface FormState {
    propertyType: string;
    timeline: string;
    rooms: string;
    furnishing: string;
    budget: string;
    contribution: string;
    state: string;
    lga: string;
    partnerType: string;
    sharedValues: string;
}