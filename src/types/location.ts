export type Location = {
  label: string;
  location: string;
  description: string;
  contact: {
    email: string;
    phone: string;
    location: {
      name: string;
      link: string;
    };
  };
};
