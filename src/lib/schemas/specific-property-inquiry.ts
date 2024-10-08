import { z } from "zod";

const specificPropertyInquirySchema = z.object({
  firstName: z
    .string({
      required_error: "First Name is required",
      invalid_type_error: "Invalid First Name",
    })
    .min(1, "First Name is required")
    .min(3, "First name must be at least 3 characters long")
    .max(30, "First name must be at most 30 characters long"),
  lastName: z
    .string({
      required_error: "Last Name is required",
      invalid_type_error: "Invalid Last Name",
    })
    .min(1, "Last Name is required")
    .min(3, "Last name must be at least 3 characters long")
    .max(30, "Last name must be at most 30 characters long"),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid Email",
    })
    .min(1, "Email is required")
    .email("Invalid Email"),
  phone: z
    .string({
      required_error: "Phone Number is required",
      invalid_type_error: "Invalid Phone Number",
    })
    .min(1, "Phone Number is required")
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
      message: "Invalid Phone Number",
    }),
  propertyId: z
    .string()
    .min(1, "Property Id is required")
    .cuid("Invalid Property Id"),
  message: z
    .string({
      required_error: "Message is required",
      invalid_type_error: "Invalid Message",
    })
    .min(1, "Message is required")
    .max(500, "Message must be at most 500 characters long"),
  agreeOnTerms: z.literal(true, {
    errorMap: () => ({
      message: "You have to agree to the terms and conditions",
    }),
  }),
});

type SpecificPropertyInquiry = z.infer<typeof specificPropertyInquirySchema>;

export { specificPropertyInquirySchema, type SpecificPropertyInquiry };
