import React from "react";
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
  variant?: TypographyVariant;
  children: string | number;
  className?: string;
}

const Div = styled.div``;

function Typography({ variant, children, className }: TypographyInterface) {
  return (
    <Div className={className} as={typographyDefaultConfig[variant].tag}>
      {children}
    </Div>
  );
}

Typography.defaultProps = {
  variant: TypographyVariant.body
};

export default styled(Typography)`
  color: ${props => typographyDefaultConfig[props.variant].color};
  font-size: ${props => typographyDefaultConfig[props.variant].fontSize};
  font-weight: ${props => typographyDefaultConfig[props.variant].fontWeight};
  margin-bottom: ${props =>
    typographyDefaultConfig[props.variant].marginBottom};
  :first-letter {
    text-transform: ${props =>
      typographyDefaultConfig[props.variant].firstLetter.textTransform};
  }
`;
