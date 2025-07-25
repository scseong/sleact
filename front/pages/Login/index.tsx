import { useCallback, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useToast from "@hooks/useToast";
import useInput from "@hooks/useInput";
import useUser from "@hooks/useUser";
import { Form, Error, Label, Input, LinkContainer, Button, Header } from "@pages/SignUp/styles";
import { login } from "@apis/auth";

const Login = () => {
  const { user, mutate } = useUser();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [logInError, setLogInError] = useState("");
  const { successTopRight } = useToast();

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLogInError("");

      try {
        const response = await login({ email, password });
        if (response) {
          successTopRight({ message: "로그인에 성공했습니다." });
          mutate();
        }
      } catch (error) {
        setLogInError((error as any).message);
      }
    },
    [email, password],
  );

  if (user) {
    return <Navigate to="/workspace/sleact/channel/일반" replace={true} />;
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input
              type="current-password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default Login;
