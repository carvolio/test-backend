{ pkgs }:
pkgs.mkDerivation {
  name = "my-node-project";
  buildInputs = [
    pkgs.node
    pkgs.npm
  ];
  src = pkgs.fetchFromGit {
    url = "https://github.com/carvolio/test-backend.git";
    rev = "main";
  };
  outputs = [ "out" ];
  phases = [ "unpack" "install" "build" ];
  installPhase = ''
    runHook ./setup.sh
    npm install --production
  '';
  buildPhase = ''
    npm run build
  '';
}