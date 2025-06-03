import { useCallback, useState } from "react";
import useInput from "@hooks/useInput";
import useToast from "@hooks/useToast";
import { signup } from "@apis/auth";
import { Form, Label, Input, LinkContainer, Button, Header, Error } from "./styles";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useUser from "@hooks/useUser";

const SignUp = () => {
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const { user } = useUser();
  const { successTopRight } = useToast();
  const navigate = useNavigate();

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    setMismatchError(value !== passwordCheck);
  };

  const onChangePasswordCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPasswordCheck(value);
    setMismatchError(value !== password);
  };

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSignUpError("");

      try {
        if (!mismatchError && nickname) {
          const isSuccess = await signup({ nickname, password, email });

          if (isSuccess) {
            successTopRight({ message: "회원가입에 성공했습니다. 로그인 페이지로 이동합니다." });
            navigate("/login", { replace: true });
          }
        }
      } catch (error) {
        setSignUpError((error as any).message);
      }
    },
    [email, nickname, password, passwordCheck, mismatchError],
  );

  if (user) {
    return <Navigate to="/workspace/slaect/channel/일반" replace={true} />;
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
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input
              type="text"
              id="nickname"
              name="nickname"
              value={nickname}
              onChange={onChangeNickname}
            />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input
              type="new-password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="new-password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
