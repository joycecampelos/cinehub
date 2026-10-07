const { supabase } = require("../db.js");

exports.signup = async (username, email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
      }).then(async response => {
        const { user } = response.data;
        if (response.error) {
          throw new Error(response.error.message);
        }

        const { error: profileError } = await supabase
          .from('user')
          .insert([{ id: user.id, username: username, email: email }]);

        if (profileError) {
          console.log(profileError);
          throw new Error(profileError.message);
        }

        resolve(user.identities[0].identity_id);
      });
    } catch (error) {
      console.log("error ==> ", error);
      reject(error);
    }
  });
}

exports.login = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        console.error('Error signing in:', error.message);
        throw new Error(error.message)

      } else {
        resolve({
          userId: data.user.id,
          token: data.session.access_token
        })
      }
    } catch (error) {
      reject(error);
    }
  });
}

exports.getFavoritos = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, error } = await supabase
        .from('tbl_filmesFavoritados')
        .select('*')
        .eq('uid_usuario', userId)
        .single();

      if (error) {
        console.error('Error fetching favoritos:', error.message);
        throw new Error(error.message)

      } else {
        resolve(data.uid_filme)
      }
    } catch (error) {
      reject(error);
    }
  });
}
