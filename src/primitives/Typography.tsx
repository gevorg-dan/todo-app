import React, { ReactNode } from "react";
import styled from "styled-components";

import { colors } from "colors";

export enum TypographyVariant {
  title,
  subtitle,
  body,
  caption
}

const typographyDefaultConfig: Record<
  TypographyVariant,
  {
    color: string;
    fontSize: string;
    fontWeight: "300" | "400" | "500" | "600";
    marginBottom: string;
    tag: keyof JSX.IntrinsicElements | React.ComponentType<any>;
    firstLetter: {
      textTransform: "uppercase" | "lowercase" | "none";
    };
  }
> = {
  [TypographyVariant.title]: {
    color: colors.black,
    fontSize: "3rem",
    fontWeight: "500",
    marginBottom: "0.35rem",
    tag: "h3",
    firstLetter: {
      textTransform: "uppercase"
    }
  },
  [TypographyVariant.subtitle]: {
    color: colors.dark,
    fontSize: "1.5rem",
    fontWeight: "400",
    marginBottom: "0.5rem",
    tag: "h4",
    firstLetter: {
      textTransform: "uppercase"
    }
  },
  [TypographyVariant.body]: {
    color: colors.black,
    fontSize: "0.875rem",
    fontWeight: "300",
    marginBottom: "0.35rem",
    tag: "p",
    firstLetter: {
      textTransform: "uppercase"
    }
  },
  [TypographyVariant.caption]: {
    color: colors.gray,
    fontSize: "0.8rem",
    fontWeight: "300",
    marginBottom: "0",
    tag: "span",
    firstLetter: {
      textTransform: "uppercase"
    }
  }
};

interface TypographyInterface {
  className?: string;
  variant?: TypographyVariant;
  children?: ReactNode;
}

const Div = styled.div``;

function Typography({ className, variant, children }: TypographyInterface) {
  return (
    <Div className={className} as={typographyDefaultConfig[variant].tag}>
      {children}
    </Div>
  );
}

const StyledTypography = styled(Typography)`
  color: ${({ variant }) => typographyDefaultConfig[variant].color};
  font-size: ${({ variant }) => typographyDefaultConfig[variant].fontSize};
  font-weight: ${({ variant }) => typographyDefaultConfig[variant].fontWeight};
  margin-bottom: ${({ variant }) =>
    typographyDefaultConfig[variant].marginBottom};
  :first-letter {
    text-transform: ${({ variant }) =>
      typographyDefaultConfig[variant].firstLetter.textTransform};
  }
`;

StyledTypography.defaultProps = {
  variant: TypographyVariant.body
};

export default StyledTypography;
