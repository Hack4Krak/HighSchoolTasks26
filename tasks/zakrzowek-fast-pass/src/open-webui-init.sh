set -eu

until curl -fsS "$OPEN_WEBUI_URL" >/dev/null; do
  sleep 1
done

admin_response=$(curl -fsS -X POST "$OPEN_WEBUI_URL/api/v1/auths/signup" \
  -H 'Content-Type: application/json' \
  --data '{"name":"Zakrzowek Admin","email":"'"$ADMIN_EMAIL"'","password":"'"$ADMIN_PASSWORD"'"}' || true)
admin_token=$(printf '%s' "$admin_response" | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')

if [ -z "$admin_token" ]; then
  admin_response=$(curl -fsS -X POST "$OPEN_WEBUI_URL/api/v1/auths/signin" \
    -H 'Content-Type: application/json' \
    --data '{"email":"'"$ADMIN_EMAIL"'","password":"'"$ADMIN_PASSWORD"'"}')
  admin_token=$(printf '%s' "$admin_response" | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')
fi

config=$(curl -fsS "$OPEN_WEBUI_URL/api/v1/auths/admin/config" \
  -H "Authorization: Bearer $admin_token")
config=$(printf '%s' "$config" | sed 's/"ENABLE_SIGNUP":false/"ENABLE_SIGNUP":true/' | sed 's/"DEFAULT_USER_ROLE":"[^"]*"/"DEFAULT_USER_ROLE":"user"/')
curl -fsS -X POST "$OPEN_WEBUI_URL/api/v1/auths/admin/config" \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $admin_token" \
  --data "$config" >/dev/null

sleep infinity
