import React from "react";

export interface ButtonProps {
    classNameValue?: string;
    label: string; // Texte du bouton
    onClick: () => void; // Fonction de clic
}

export const Button: React.FC<ButtonProps> = ({ onClick, label, classNameValue}) => {
    return (
        <button
            onClick={onClick}
            className={classNameValue}
            aria-label={label}
        >
            {label}
        </button>
    );
};
