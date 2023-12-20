import { Button, Grid, TextField, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import api, { validateSignInRequestBody } from "~/apis/backend/api";
import { SignInRequestBody } from "~/apis/backend/gen";
import HeaderLayout from "~/components/organisms/HeaderLayout";
import sha256 from "crypto-js/sha256";
import { useOptionalUser } from "~/hooks/OptionalUserContext/helper";

const SignIn = () => {
  const [form, setForm] = useState<SignInRequestBody>({
    email: "",
    password: "",
  });
  const errorMessages = useMemo<SignInRequestBody>(() => {
    return validateSignInRequestBody(form);
  }, [form]);
  const isValidForm = useMemo(() => {
    if (Object.values(form).some((val) => val === "")) {
      return false;
    }
    if (Object.values(errorMessages).some((val) => val !== "")) {
      return false;
    }
    return true;
  }, [errorMessages, form]);
  const { fetchUser } = useOptionalUser();

  const onChangeForm = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setForm((prev) => {
        return { ...prev, [event.target.name]: event.target.value };
      });
    },
    [],
  );

  const signInWithPassword = useCallback(async () => {
    if (!isValidForm) {
      alert("不正なフォームです");
      return;
    }
    try {
      await api.signIn({
        email: form.email,
        password: sha256(form.password).toString(),
      });
      await fetchUser();
    } catch (error) {
      alert("ログインに失敗しました");
      return;
    }
  }, [fetchUser, form.email, form.password, isValidForm]);

  return (
    <HeaderLayout>
      <Grid
        container
        direction="column"
        sx={{ padding: 5, maxWidth: 400 }}
        spacing={3}
      >
        <Grid item>
          <Typography variant="h5" component="h1">
            サインイン
          </Typography>
        </Grid>
        <Grid item container direction="column" spacing={2}>
          <Grid item>
            <TextField
              name="email"
              id="email"
              onChange={onChangeForm}
              value={form.email}
              type="email"
              label="Eメール"
              error={errorMessages.email !== ""}
              helperText={errorMessages.email}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item>
            <TextField
              name="password"
              id="password"
              onChange={onChangeForm}
              value={form.password}
              type="password"
              label="パスワード"
              error={errorMessages.password !== ""}
              helperText={errorMessages.password}
              sx={{ width: "100%" }}
            />
          </Grid>
        </Grid>

        <Grid item container justifyContent="center">
          <Button
            variant="contained"
            onClick={signInWithPassword}
            sx={{ width: "100%" }}
            disabled={!isValidForm}
          >
            送信
          </Button>
        </Grid>
      </Grid>
    </HeaderLayout>
  );
};

export default SignIn;
