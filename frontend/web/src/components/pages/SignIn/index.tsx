import { Button, Grid, TextField, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { validateSignInRequestBody } from "~/apis/backend/api";
import { SignInRequestBody } from "~/apis/backend/gen";
import HeaderLayout from "~/components/organisms/HeaderLayout";
import { useSignInMutation } from "~/apis/backend/mutation";

const SignIn = () => {
  const [form, setForm] = useState<SignInRequestBody>({
    email: "",
    password: "",
  });
  const signInMutation = useSignInMutation();

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

  const onChangeForm = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setForm((prev) => {
        return { ...prev, [event.target.name]: event.target.value };
      });
    },
    [],
  );

  const signInWithPassword = useCallback(() => {
    if (!isValidForm) {
      alert("不正なフォームです");
      return;
    }
    const { email, password } = form;
    signInMutation.mutate({ email, password });
  }, [form, isValidForm, signInMutation]);

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
