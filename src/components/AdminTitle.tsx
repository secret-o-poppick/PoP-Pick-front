import styled from 'styled-components';


interface AdminTitleProps {
    title: string;
}

const AdminTitle: React.FC<AdminTitleProps> = ({ title }) => {
    return (
        <StyledTitle>
            {title}
        </StyledTitle>
    );
};

const StyledTitle = styled.h2`
    letter-spacing: 1.2px;
    font-weight: bold;
    font-size: 1.7em;
    padding-left: 12px;
    margin-bottom: 56px;
    border-left: 5px solid #e4edff;
`;

export default AdminTitle;