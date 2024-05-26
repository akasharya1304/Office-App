function AuthPageLayout(props) {
  return (
    <div className="w-full h-screen
    flex justify-center items-center
    bg-gradient-to-r from-drawerEnd to-drawerStart bg-no-repeat
    ">
      {props.children}
    </div>
  );
}

export default AuthPageLayout;
