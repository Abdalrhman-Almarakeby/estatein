import { prisma } from "@/lib/prisma";

export async function verifyEmail(token?: string | undefined) {
  if (!token) {
    return {
      success: false,
      message: "Invalid or missing token",
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { emailVerificationToken: token },
    });

    if (!user) {
      return {
        success: false,
        message: "Invalid or expired token",
      };
    }

    if (
      user.emailVerificationExpires &&
      new Date() > user.emailVerificationExpires
    ) {
      return {
        success: false,
        message: "Token has expired. Please request a new verification email",
      };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        emailVerificationToken: null,
        emailVerificationExpires: null,
      },
    });

    return {
      success: true,
      message: "Email verified successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to verify email",
    };
  }
}
