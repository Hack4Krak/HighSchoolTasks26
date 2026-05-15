gcc -O0 -g -fno-stack-protector -no-pie \
  -o tasks/slowacki-backstage/assets/slowacki-backstage \
  tasks/slowacki-backstage/src/slowacki_backstage.c \
  tasks/slowacki-backstage/src/backstage_ai_canary.c