import { useAuthStore } from "@/entities/auth/model/store";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import React from "react";
import { useNavigate } from "react-router-dom";

export function SignUpForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [email, setEmail] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repassword, setRepassword] = React.useState("");
  const [error, setError] = React.useState("");

  const { session, signUp, loading } = useAuthStore();

  const navigate = useNavigate();

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await signUp({ email, password });
      if (result.success) {
        navigate("/main");
      }
    } catch (error) {
      setError("error");
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Создать аккаунт</CardTitle>
        <CardDescription>
          Введите вашу информацию ниже, чтобы создать аккауnt
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Полное имя</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Иван Иванов"
                required
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Электронная почта</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <FieldDescription>
                Мы будем использовать это для связи с вами. Мы не будем делиться
                вашей электронной почтой с кем-либо еще.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Пароль</FieldLabel>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <FieldDescription>
                Должен содержать не менее 6 символов.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Подтвердите пароль
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                required
                value={repassword}
                onChange={(event) => setRepassword(event.target.value)}
              />
              <FieldDescription>
                Пожалуйста, подтвердите ваш пароль.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={loading}>
                  Создать аккаунт
                </Button>
                <Button variant="outline" type="button" disabled>
                  Войти через Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Уже есть аккаунт? <a href="/signin">Войти</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
