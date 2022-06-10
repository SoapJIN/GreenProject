import styled from "styled-components";

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
        <Nav>
            <Button  onClick={() => setPage(page - 1)} disabled={page === 1}>
                &lt;
            </Button>
            {Array(numPages)
                .fill()
                .map((_, i) => (
                    <Button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    aria-current={page === i + 1 ? "page" : null}
                    >
                    {i + 1}
                    </Button>
            ))}
            <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
                &gt;
            </Button>
        </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: 1px;
  border-style: solid;
  border-color: black;
  border-radius: 8px;
  padding: 6px 10px 6px 10px;
  margin: 0;
  background: white;
  color: black;
  font-size: 1rem;

  &:hover {
    background: black;
    color: white;
    cursor: pointer;
    transform: translateY(-1px);
  }

  &[disabled] {
    border:0;
    background: gainsboro;
    color:white;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: black;
    color : white;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;
